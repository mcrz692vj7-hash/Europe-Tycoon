# Europe Tycoon — Alpha 0.3 Part 1

Przeglądarkowa gra idle o rozwijaniu gospodarki Europy. Ta część wydania skupia się na grywalnym rdzeniu ekonomii Polski.

## Uruchomienie

Otwórz `index.html` w Safari, Chrome, Firefox lub Edge. Projekt nie wymaga instalacji ani serwera.

## Zawartość

- kliknięcie startowe `0,50 zł` i sześć ulepszeń kliknięcia;
- siedem budynków z limitami inspirowanymi potencjałem Polski;
- zakup `×1`, `×10`, `×100`, `×1000` i `MAX`;
- dochód pasywny, dochód offline (maks. 4 godziny) oraz statystyki;
- zapis w `localStorage` co pięć sekund;
- polski i angielski interfejs;
- responsywny ciemny interfejs.

## Struktura

```text
index.html          interfejs gry
css/style.css        wygląd i responsywność
js/data.js           konfiguracja kraju, budynków i ulepszeń
js/i18n.js           teksty PL/EN
js/storage.js        trwały zapis lokalny
js/game.js           stan i reguły ekonomii
js/ui.js             renderowanie oraz obsługa interfejsu
js/app.js            uruchomienie gry i pętla czasu
```

## Uwaga o zapisie

Przycisk z ikoną `↻` usuwa cały zapis tej wersji z przeglądarki. Zapis gry jest przypisany do używanej przeglądarki i komputera.
