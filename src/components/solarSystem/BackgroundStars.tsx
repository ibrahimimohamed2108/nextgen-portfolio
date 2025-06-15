
const BackgroundStars = () => {
  return (
    <div className="absolute inset-0">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full opacity-60"
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 3 + 's'
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundStars;
