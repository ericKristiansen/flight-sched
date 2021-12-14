namespace Trips.Data
{
    public interface ITripService
    {
        public List<Trip> GetAllTrips();

        public Trip GetTripById(int tripId);

        public void UpdateTrip(int tripId, Trip trip);

        public void DeleteTrip(int tripId);

        public void AddTrip(Trip trip);

    }
}