const ListingGrid = ({ items, buttonText }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white p-4 rounded shadow hover:shadow-lg"
        >
          <a href={item.link}>
            <h4 className="text-xl font-bold">{item.name}</h4>
            <p className="text-bright-blue">{buttonText}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ListingGrid;
