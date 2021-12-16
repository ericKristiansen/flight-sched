
using Microsoft.AspNetCore.Mvc;
using Trips.Data;

namespace Trips.Controllers
{

    //define route
    [Route("api/[controller]")]
    public class TripsController: Controller
    {
        private ITripService _tripService;
         public TripsController(ITripService service)
        {
            _tripService = service;
        }

        //api endpoints
        [HttpPost("AddTrip")]
        public IActionResult AddTrip([FromBody]Trip trip)
        {
            if (trip != null)
            {
                _tripService.AddTrip(trip);
            }
            return Ok();
        }

        [HttpGet("[action]")]
        public IActionResult GetTrips()
        {
            var trips = _tripService.GetAllTrips();
            return Ok(trips);
        }

        [HttpPut("UpdateTrip/{id}")]
        public IActionResult UpdateTrip(int id, [FromBody]Trip trip)
        {
            _tripService.UpdateTrip(id, trip);
            return Ok(trip);
        }

        [HttpDelete("DeleteTrip/{id}")]
        public IActionResult DeleteTrip(int id)
        {
            _tripService.DeleteTrip(id);
            return Ok();
        }

        [HttpGet("GetTrip/{id}")]
        public IActionResult GetTripById(int id)
        {
            var trip = _tripService.GetTripById(id);
            return Ok(trip);
        }

    }
}