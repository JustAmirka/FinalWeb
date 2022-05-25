mapboxgl.accessToken =
  "pk.eyJ1IjoibS0xMzVhIiwiYSI6ImNrOGsyb3ZqaDBkemkzcW10emc1eXoyNngifQ.NuSNrMKqrpdm-jxvPpx0_Q";
const lat = 51.1048;
const lng = 71.2645;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 8,
  center: [lng, lat],
});

const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
