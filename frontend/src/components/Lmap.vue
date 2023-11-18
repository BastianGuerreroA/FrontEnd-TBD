<template>
  <div>
    <select class="form-select form-select-lg mb-3" name="select-location" id="select-location" @change="updateMap">
      <option value="-1">Seleccione un lugar</option>
      <option value="-33.45694,-70.64827">Santiago</option>
    </select>
    <div ref="map" style="height: 400px;"></div>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-minimap/dist/Control.MiniMap.min.css';
import 'leaflet-minimap';
export default {
  name: 'LmapComponent',
  data() {
    return {
      map: null,
      minimap: null,
      chileCoordinates: [
        [-56.3167, -68.1833],
        [-17.4984, -66.1496],
        [-17.4984, -66.1496],
        [-9.7619, -70.5136],
        [-9.7619, -70.5136],
        [-22.7359, -67.166],
        [-52.0986, -69.2019],
        [-53.5011, -70.3603],
        [-75.4999, -70.2586],
        [-75.4999, -70.2586],
        [-79.9999, -66.9196],
        [-67.3075, -66.5456],
        [-66.6009, -67.6792],
        [-68.6347, -71.0147],
        [-71.1076, -74.2767],
        [-68.6347, -71.0147],
        [-68.6347, -71.0147],
        [-66.6009, -67.6792],
        [-66.3293, -68.3392],
        [-53.5011, -70.3603],
        [-52.0986, -69.2019],
        [-22.7359, -67.166],
        [-9.7619, -70.5136],
        [ -9.7619, -70.5136],
        [-17.4984, -66.1496],
        [-17.4984, -66.1496],
        [-56.3167, -70.1833],
      ],
    };
  },
  mounted() {
    this.initializeMap();
    this.addChilePolygon();
    this.agregaMarcadores();
  },
  methods: {
    initializeMap() {
      // Centrar el mapa en Chile
      this.map = L.map(this.$refs.map).setView([-35.6751, -71.543], 6);

      // Añadir un proveedor de mapas (por ejemplo, OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      // Crar minimap
      this.minimap = new L.Control.MiniMap(
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
        {
          toggleDisplay: true,
          minimized: false,
          position: 'bottomleft'
        },
      ).addTo(this.map);


    },
    addChilePolygon() { //Añadir esta funcion al mounted para que se ejecute al cargar la pagina, por si quieren probar.
      // Añadir una capa de polígono que representa a Chile
      L.polygon(this.chileCoordinates, { color: 'green' }).addTo(this.map);

    },
    updateMap(event) {
      const selectedLocation = event.target.value;
      if (selectedLocation === '-1') {
        // Si se selecciona la opción predeterminada, centrar en Chile
        this.map.flyTo([-35.6751, -71.543], 6, { duration: 1.5 });
      } else {
        // Si se selecciona una ubicación específica, centrar en esa ubicación con flyTo(Te dirije a la ubicacion seleccionada y de manera suave)
        const [lat, lng] = selectedLocation.split(',').map(Number);
        this.map.flyTo([lat, lng], 13, { duration: 1.5 });
      }
    },

    agregaMarcadores() {
      //Agrega marcadores al mapa
      L.circleMarker(L.latLng(-33.45694, -70.64827), {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 5,
      }).addTo(this.map);
    },
  },
};
</script>

<style scoped>
</style>

