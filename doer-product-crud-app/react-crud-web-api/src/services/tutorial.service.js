import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/tutorials");
  }

  get(id) {
    return http.get(`/tutorials/${id}`);
  }

  create(data) {
    return http.post("/tutorials", data);
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }

  findByAvailability(availability) {
     return http.get(`/tutorials/find?availability=${availability}`);
  }

  scheduleDoers(doers, searchAvailability) {
    var data = {
        "doers_requested": doers,
        "searchAvailability": searchAvailability
    } ;
    console.log("data in schedule doers is:");
    console.log(data);
    return http.post("/tutorials/createScheduleRequests", data);
  }
}

export default new TutorialDataService();