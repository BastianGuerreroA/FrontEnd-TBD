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
import axios from "axios";
export default {
  name: 'LmapComponent',
  data() {
    return {
      map: null,
      minimap: null,
      regions: []
    };
  },
  mounted() {
    this.fetchRegionData();
    this.initializeMap();
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
    fetchRegionData() {
      axios.get("http://localhost:8090/api/region")
          .then(response => {
            this.regions = response.data;
            console.log(response.data);
            console.log(this.regions);
          })
          .catch(error => {
            console.error("Error fetching region data:", error);
          });
    },
    addChilePolygons() {
      // Añadir polígonos al mapa utilizando los datos almacenados en la variable 'regions'
      this.regions.forEach(region => {
        const polygon = L.polygon(region.geom.coordinates, { color: 'green' }).addTo(this.map);
        polygon.bindPopup(region.name);
      });
    },
    updateMap(event) {
      const selectedLocation = event.target.value;
      if (selectedLocation === '-1') {
        // Si se selecciona la opción predeterminada, centrar en Chile
        this.map.flyTo([-35.6751, -71.543], 6, { duration: 1.5 });
      } else {
        // Si se selecciona una ubicación específica, va centrar en esa ubicación con flyTo(Te dirije a la ubicacion seleccionada y de manera suave)
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

