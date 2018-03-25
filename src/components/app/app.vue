<template>
    <div id="app" class="full-height">
        <div id="wrapper">
            <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <div class="navbar-item">
                        <img src="./g30k.png">
                    </div>
                    <div class="navbar-burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="navbar-menu">
                    <div class="navbar-start">
                        <div class="navbar-item is-paddingless">
                            <h1 class="is-size-4 has-text-weight-light">Sleepmap routingtest</h1>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="container is-fluid is-marginless grow">
                <div class="columns is-gapless is-multiline full-height">
                    <div class="column is-two-fifths-tablet is-one-third-desktop is-one-quarter-widescreen">
                        <div class="zijbalk">
                            <pdok-search></pdok-search>
                            <div class="box">
                                <p>Gebruik de adreszoeker hierboven of de kaart om een perceel te selecteren. De kadastrale kaartlaag verschijnt pas na voldoende inzoomen.</p>
                                <p class="has-text-right">
                                    <a @click="$store.commit('toggleModal', 'over')">Meer informatie</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <leaflet></leaflet>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./app.ts"></script>

<style>
html,
body {
  height: 100% !important;
  overflow: hidden !important;
}

.full-height {
  height: 100% !important;
}

.full-width {
  height: 100% !important;
}

#wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.grow {
  flex: 2;
}

.zijbalk > * {
  margin: 1rem !important;
}
</style>
