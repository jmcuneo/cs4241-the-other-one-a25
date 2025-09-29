window.onload = function() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', 1600);
  svg.setAttribute('height', 1650);
  document.body.appendChild(svg);

  fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json")
    .then(data => data.json())
    .then(jsonData => {
      const radii = d3.scaleSqrt()
        .domain([0, d3.max(jsonData.pokemon, d => d.avg_spawns)])
        .range([20, 150]);

      const simulation = d3.forceSimulation(jsonData.pokemon)
        .force('charge', d3.forceManyBody().strength(8))
        .force('center', d3.forceCenter(750, 825))
        .force('collision', d3.forceCollide().radius(d => radii(d.avg_spawns) + 2))
        .stop();

      for (let i = 0; i < 151; i++)
        simulation.tick();

      const group = d3.select('svg').selectAll('.pokemon')
        .data(d3.entries(jsonData.pokemon))
        .join('g')
        .attr('transform', d => `translate(${d.value.x}, ${d.value.y})`);

      group.append('circle')
        .attr('fill', d => `rgba(${ Math.floor(d.value.avg_spawns * 2) }, 0, 120, 1 )`)
        .attr('r', d => radii(d.value.avg_spawns));

      group.append('text')
        .text(d => d.value.name + ":")
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .attr('y', '-0.5em')
        .style('font-size', d => radii(d.value.avg_spawns) / 5);

      group.append('text')
        .text(d => d.value.spawn_chance + "% Spawn Rate")
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .attr('y', '0.7em')
        .style('font-size', d => radii(d.value.avg_spawns) / 5);
    })
}