import http from "../http-common";

class DoerDataService {
  getAll() {
    return http.get("/doers");
  }

  get(id) {
    return http.get(`/doers/${id}`);
  }

  create(data) {
    return http.post("/doers", data);
  }

  update(id, data) {
    return http.put(`/doers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/doers/${id}`);
  }

  deleteAll() {
    return http.delete(`/doers`);
  }

  findByServices(services) {
    return http.get(`/doers?services=${services}`);
  }

  findByName(name) {
      return http.get(`/doers?name=${name}`);
  }

  findByAvailabilityandServices(availability, services) {
     return http.get(`/doers/find?availability=${availability}&services=${services}`);
  }

  findByDoerId(doerId) {
     return http.get(`/doers/findByDoerId?doerId=${doerId}`);
  }

  getAllReservationsRequests() {
   return http.get(`/doers/getAllReservationsRequests`);
  }

  getReservationsRequestsbyDoerIdandState(doerId, state) {
     return http.get(`/doers/getReservationsRequests?doerId=${doerId}&state=${state}`);
    }


  scheduleDoers(doers, searchAvailability, searchServices) {
    var data = {
        "doers_requested": doers,
        "searchAvailability": searchAvailability,
        "searchServices": searchServices
    } ;
    console.log("data in schedule doers is:");
    console.log(data);
    return http.post("/doers/createScheduleRequests", data);
  }

  acceptJobs(reservations, doerId) {
    var data = {
        "doers_requested": doerId,
        "reservations": reservations
    } ;
    console.log("data in acceptJobs is:");
    console.log(data);
    return http.post("/doers/acceptReservationRequests", data);
  }

   abandonJobs(reservations, doerId) {
      var data = {
          "doers_requested": doerId,
          "reservations": reservations
      } ;
      console.log("data in abandonJobs is:");
      console.log(data);
      return http.post("/doers/abandonReservationRequests", data);
    }

   completeJobs(reservations, doerId) {
      var data = {
          "doers_requested": doerId,
          "reservations": reservations
      } ;
      console.log("data in completeJobs is:");
      console.log(data);
      return http.post("/doers/completeReservationRequests", data);
    }

   declineJobs(reservations, doerId) {
      var data = {
          "doers_requested": doerId,
          "reservations": reservations
      } ;
      console.log("data in acceptJobs is:");
      console.log(data);
      return http.post("/doers/declineReservationRequests", data);
    }
}

export default new DoerDataService();