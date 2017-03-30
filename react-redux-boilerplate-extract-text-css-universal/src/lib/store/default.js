function getDefaultState() {
  return {
    todos: [],
    randomUsers: {
      list: [],
      loading: false,
      error: false,
    },
  };
}

export default getDefaultState();
