import axios from'axios'


const instance = axios.create({
  baseURL: "https://starnavi-frontend-test-task.herokuapp.com/",
});

export function getSettings() {
  return instance.get(`/game-settings`);
}
export function getWinners() {
  return instance.get("/winners");
}
export function setWinner(winner, date) {
  return instance.post(`/winners`, {winner, date});
}

export default instance