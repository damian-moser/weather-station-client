export default {
  getTime: (t: number) => {
    const date = new Date(t);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  },
};
