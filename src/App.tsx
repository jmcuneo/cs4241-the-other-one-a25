import { useState, useEffect } from "react";

interface Game {
  name: string;
  review: string;
  price: number;
}

export default function GameWishlist() {
  const [games, setGames] = useState<Game[]>([]);
  const [gameName, setGameName] = useState("");
  const [gameReview, setGameReview] = useState("");
  const [gamePrice, setGamePrice] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch("/appdata", {
        method: "GET",
      });
      const contents = await response.json();
      console.log("response:", contents);
      setGames(contents);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!gameName || !gameReview || !gamePrice) return;

    const json = [{
      name: gameName,
      review: gameReview,
      price: gamePrice
    }];
    const body = JSON.stringify(json);

    // Clear inputs
    setGameName("");
    setGameReview("");
    setGamePrice("");
    setEditingIndex(null);

    try {
      const response = await fetch("/submit", {
        method: "POST",
        body
      });

      const newData = await response.json();
      console.log("updated data:", newData);
      setGames(newData);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const removeRow = async (rowNum: number) => {
    const body = JSON.stringify(rowNum);
    
    try {
      const response = await fetch("/remove", {
        method: "POST",
        body
      });

      const newData = await response.json();
      setGames(newData);
    } catch (error) {
      console.error("Error removing row:", error);
    }
  };

  const editRow = (name: string, review: string, price: number, index: number) => {
    setGameName(name);
    setGameReview(review);
    setGamePrice(price.toString());
    setEditingIndex(index);
  };

  const totalPrice = games.reduce((sum, game) => sum + Number(game.price), 0);
  const averagePrice = games.length > 0 ? totalPrice / games.length : 0;

  return (
    <div style={{ 
      fontFamily: 'Inter, sans-serif',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      
      <h1>Game Wishlist</h1>
      
      <div className="flex-row">
        <table id="wishlist">
          <thead>
            <tr>
              <th>Name</th>
              <th>Review</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, index) => (
              <tr key={index}>
                <td>{game.name}</td>
                <td>{game.review}</td>
                <td>{game.price}</td>
                <td>
                  <button 
                    className="edit-btn"
                    onClick={() => {
                      editRow(game.name, game.review, Number(game.price), index);
                      removeRow(index);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button 
                    className="delete-btn"
                    onClick={() => removeRow(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="flex-col">
          <h2>{editingIndex !== null ? 'Edit Game' : 'Modify List'}</h2>
          <form onSubmit={submit}>
            <input
              type="text"
              id="gamename"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              placeholder="Game Name"
            />
            <input
              type="text"
              id="gamereview"
              value={gameReview}
              onChange={(e) => setGameReview(e.target.value)}
              placeholder="Game Review"
            />
            <input
              type="number"
              id="gameprice"
              value={gamePrice}
              onChange={(e) => setGamePrice(e.target.value)}
              placeholder="Game Price"
            />
            <button type="submit">
              {editingIndex !== null ? 'Update Game' : 'Add Game'}
            </button>
          </form>
        </div>
      </div>
      
      <form>
        <table id="derived">
          <thead>
            <tr>
              <th>Total Price</th>
              <th>Average Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{totalPrice.toFixed(2)}</td>
              <td>{averagePrice.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}