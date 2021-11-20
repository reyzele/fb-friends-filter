import mockFriendsList from "../../mock/friends-list";

export default () => {
  const source = document.querySelector("#allFriends");
  const target = document.querySelector("#savedFriends");
  const saveButton = document.querySelector("#saveButton");
  const savedFriends = JSON.parse(localStorage.FB_Friends || "[]");

  saveButton.addEventListener("click", () => {
    const statusOverlay = document.querySelector(".status-overlay");
    const status = statusOverlay.querySelector(".status");
    const closeOverlay = statusOverlay.querySelector("#overlay-close");
    const savedFriends = [];

    for (const element of target.children) {
      if (element.id) {
        savedFriends.push(element.id);
      }
    }

    localStorage.FB_Friends = JSON.stringify(savedFriends || "{}");

    statusOverlay.style.display = "block";
    status.innerHTML =
      "Friends list is saved. List length: " + savedFriends.length;

    closeOverlay.addEventListener("click", (e) => {
      statusOverlay.style.display = "none";
    });
  });

  function renderFriends(target, friends) {
    const template = document.querySelector("#user-template").innerHTML;
    const render = Handlebars.compile(template);
    const html = render({ items: friends });

    target.innerHTML = html;
  }

  setTimeout(() => {
    callApi(mockFriendsList);
  }, 3000);

  function callApi(friends) {
    const leftList = [];
    const rightList = [];

    friends.forEach((friend) =>
      savedFriends.includes(friend.id.toString())
        ? rightList.push(friend)
        : leftList.push(friend)
    );

    renderFriends(target, rightList);
    renderFriends(source, leftList);
  }

  return { source, target };
};
