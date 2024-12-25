
export const stickySearchStyle = (top: number = 50) => ({
  position: 'sticky',
  top,
  backgroundColor: 'rgba(255, 255, 255, 0)',
  backdropFilter: 'blur(10px)', 
  borderRadius: 2,
  py: 2,
  zIndex: 1000
});