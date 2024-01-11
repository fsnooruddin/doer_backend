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

  findByAvailability(availability, services) {
     return http.get(`/tutorials/find?availability=${availability}&services=${services}`);
  }

  findByDoerId(doerId) {
     return http.get(`/tutorials/findByDoerId?doerId=${doerId}`);
  }

  getAllReservationsRequests() {
   return http.get(`/tutorials/getAllReservationsRequests`);
  }

  scheduleDoers(doers, searchAvailability, searchServices) {
    var data = {
        "doers_requested": doers,
        "searchAvailability": searchAvailability,
        "searchServices": searchServices
    } ;
    console.log("data in schedule doers is:");
    console.log(data);
    return http.post("/tutorials/createScheduleRequests", data);
  }

  acceptJobs(reservations, doerId) {
    var data = {
        "doers_requested": doerId,
        "reservations": reservations
    } ;
    console.log("data in acceptJobs is:");
    console.log(data);
    return http.post("/tutorials/acceptReservationRequests", data);
  }

   declineJobs(reservations, doerId) {
      var data = {
          "doers_requested": doerId,
          "reservations": reservations
      } ;
      console.log("data in acceptJobs is:");
      console.log(data);
      return http.post("/tutorials/declineReservationRequests", data);
    }
}

export default new TutorialDataService();