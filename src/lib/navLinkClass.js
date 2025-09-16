export const navLinkClass = (isActive) => {
  return (
    " px-3 py-2 rounded-md text-sm font-medium transition-colors" +
    (isActive
      ? " text-foreground font-bold"
      : " text-text-secondary hover:text-foreground")
  );
};

export const navLinkClassMobile = (isActive) => {
  return (
    "block px-3 py-2 rounded-md text-base font-medium transition-colors" +
    (isActive
      ? " text-foreground font-bold"
      : " text-text-secondary hover:text-foreground")
  );
};
