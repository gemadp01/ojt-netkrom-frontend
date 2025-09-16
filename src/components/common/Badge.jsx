export const Badge = ({ children }) => {
  return (
    <div className="absolute top-4 left-4 bg-foreground text-surface px-3 py-1 rounded-full text-sm">
      {children}
    </div>
  );
};
