export const getStatus = ({
  isEdited,
  isReaded,
}: {
  isDelivered?: boolean;
  isReaded: boolean;
  isEdited: boolean;
}) => {
  if (isEdited) {
    return "Edited";
  }
  if (isReaded) {
    return "✓✓";
  }
  return "✓";
};
