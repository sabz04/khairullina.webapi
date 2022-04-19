namespace khairullina.webapi.Models
{
    public class Flight
    {
        public int id { get; set; }
        public int flight_number { get; set; }
        public string departure_post { get; set; }
        public string arrival_post { get; set; }
        public string departure_time { get; set; }
        public string arrival_time { get; set; }
    }
}
