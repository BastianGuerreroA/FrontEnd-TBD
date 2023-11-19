<template>
  <div>
    <select class="form-select form-select-lg mb-3" name="select-location" id="select-location" @change="updateMap">
      <option value="-1">Seleccione un lugar</option>
      <option v-for="(region, index) in regions" :key="index" :value="`${region.center.lat},${region.center.lng}`">{{ region.name }}</option>
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
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';

export default {
  name: 'LmapComponent',
  data() {
    return {
      map: null,
      minimap: null,
      regions: [],
      tareas: [],
      selectedRegion: null,
    };
  },
  mounted() {
    this.fetchRegionData();
    this.initializeMap();
    this.fetchTareaData();
  },
  methods: {
    initializeMap() {
      // Centrar el mapa en Chile
      this.map = L.map(this.$refs.map).setView([-35.6751, -71.543], 6);

      // Añadir un proveedor de mapas (por ejemplo, OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      // Crear minimap
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
      axios.get("http://localhost:8091/api/region")
          .then(response => {
            this.regions = response.data.map(region => {
              const invertedCoordinates = region.geom.coordinates[0].map(point => [point[1], point[0]]);
              const center = this.calculatePolygonCenter(invertedCoordinates);
              return {
                ...region,
                invertedCoordinates,
                center
              };
            });
            console.log(response.data);
            console.log(this.regions);
            this.addChilePolygons();
          })
          .catch(error => {
            console.error("Error fetching region data:", error);
          });
    },
    calculatePolygonCenter(coordinates) {
      const bounds = L.latLngBounds(coordinates);
      return bounds.getCenter();
    },
    addChilePolygons() {
      // Añadir polígonos al mapa utilizando los datos almacenados en la variable 'regions'
      this.regions.forEach(region => {
        const polygon = L.polygon(region.invertedCoordinates, { color: 'green' }).addTo(this.map);
        console.log("lo metimos");
        polygon.bindPopup(region.name);
      });
    },
    updateMap(event) {
      const selectedLocation = event.target.value;
      if (selectedLocation === '-1') {
        // Si se selecciona la opción predeterminada, centrar en Chile
        this.selectedRegion = null;
        this.map.flyTo([-35.6751, -71.543], 6, { duration: 1.5 });
      } else {
        // Si se selecciona una ubicación específica, va centrar en esa ubicación con flyTo(Te dirige a la ubicacion seleccionada y de manera suave)
        const [lat, lng] = selectedLocation.split(',').map(Number);
        this.selectedRegion = this.regions.find(region => region.center.lat === lat && region.center.lng === lng);
        this.map.flyTo([lat, lng], 8, { duration: 1.5 });
      }
      this.agregaMarcadores();
    },
    fetchTareaData() {
      axios.get("http://localhost:8091/api/tarea")
          .then(response => {
            this.tareas = response.data;
            console.log(response.data);
            console.log(this.tareas);
            this.agregaMarcadores();
          })
          .catch(error => {
            console.error("Error fetching tarea data:", error);
          });
    },
    agregaMarcadores() {
      // Limpiar los marcadores existentes
      this.map.eachLayer(layer => {
        if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
          layer.remove();
        }
      });

      // Filtrar tareas según la región seleccionada
      const tareasToDisplay = this.selectedRegion
          ? this.tareas.filter(tarea => this.isTareaInRegion(tarea))
          : [];

      // Mostrar los marcadores
      tareasToDisplay.forEach(tarea => {
        const estado = tarea.estado_tarea ? 'Activo' : 'Solucionado';
        const marker = L.circleMarker(L.latLng(tarea.latitud, tarea.longitud), {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 5,
        }).addTo(this.map);

        marker.bindPopup(`<strong>Asunto: ${tarea.asunto_tarea}</strong><br>Estado: ${estado}`);
      });
    },

    isTareaInRegion(tarea) {
      // Verificar si la tarea está dentro de la región seleccionada
      return (
          this.selectedRegion &&
          booleanPointInPolygon(
              [tarea.latitud, tarea.longitud],
              {
                type: 'Polygon',
                coordinates: [this.selectedRegion.invertedCoordinates],
              }
          )
      );
    },
  },
};
</script>

<style scoped>
</style>
