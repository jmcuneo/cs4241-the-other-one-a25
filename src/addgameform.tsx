import { useState } from "react";

interface AddGameFormProps {
  onSubmit: (name: string, review: string, price: string) => void;
  initialValues?: {
    name: string;
    review: string;
    price: string;
  };
  isEditing?: boolean;
}

export default function AddGameForm({ onSubmit, initialValues, isEditing = false }: AddGameFormProps) {
  const [gameName, setGameName] = useState(initialValues?.name || "");
  const [gameReview, setGameReview] = useState(initialValues?.review || "");
  const [gamePrice, setGamePrice] = useState(initialValues?.price || "");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (gameName && gameReview && gamePrice) {
      onSubmit(gameName, gameReview, gamePrice);
      // Clear form after submission
      setGameName("");
      setGameReview("");
      setGamePrice("");
    }
  };

  return (
    <div className="flex-col">
      <h2>{isEditing ? 'Edit Game' : 'Modify List'}</h2>
      <form onSubmit={handleSubmit}>
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
          {isEditing ? 'Update Game' : 'Add Game'}
        </button>
      </form>
    </div>
  );
}