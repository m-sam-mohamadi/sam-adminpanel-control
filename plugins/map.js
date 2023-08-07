import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDCTtCkYFjxtvi4HO6lwOv12D1nM89pjw0',
        libraries: 'places',
    },
})