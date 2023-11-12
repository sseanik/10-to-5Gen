export const getDurationColour = (durationNum: number) => {
  switch (durationNum) {
    case 1:
      return 'purple';
    case 2:
      return 'blue';
    case 3:
      return 'green';
    case 4:
      return 'yellow';
    case 5:
      return 'orange';
    default:
      return 'red';
  }
};

export const getPriorityColour = (priorityStr: string) => {
  switch (priorityStr) {
    case 'High':
      return 'red.8';
    case 'Medium':
      return 'orange.5';
    case 'Low':
      return 'green.8';
    default:
      return 'blue';
  }
};
