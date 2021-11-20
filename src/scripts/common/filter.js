export default ({ source, target }) => {
  const friendsInput = document.querySelector("#allFriendsInput");
  const listInput = document.querySelector("#listFriendsInput");
  const filterMapDnd = new Map();
  const filterMapClick = new Map();

  filterMapDnd.set(source, friendsInput);
  filterMapDnd.set(target, listInput);

  filterMapClick.set(target, friendsInput);
  filterMapClick.set(source, listInput);

  makeKeyup([friendsInput, listInput]);

  function friendsFilter(e) {
    if (e.target === friendsInput) {
      filterFriends(e.target.value, source);
    } else if (e.target === listInput) {
      filterFriends(e.target.value, target);
    }
  }

  function filterFriends(value, where) {
    const item = where.querySelectorAll(".friends__item");

    item.forEach(item => {
      const name = item.querySelector(".friends__name");

      if (value) {
        isMatching(name.textContent, value)
          ? item.classList.remove("hidden")
          : item.classList.add("hidden");
      } else {
        item.classList.remove("hidden");
      }
    });
  }

  function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
  }

  function makeKeyup(inputs) {
    inputs.forEach(input => {
      input.addEventListener("keyup", friendsFilter);
    });
  }

  return { filterMapDnd, filterMapClick };
};
