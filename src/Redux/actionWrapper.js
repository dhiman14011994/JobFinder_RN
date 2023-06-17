export const putActions = actionType => {
  return {
    ACTION: actionType,
    REQUEST: `${actionType}_REQUEST`,
    SUCCESS: `${actionType}_SUCCESS`,
    FAILED: `${actionType}_FAILED`,
  };
};
