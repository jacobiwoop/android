# Projet Capacitor - Android Build via GitHub Actions

Ce projet est configuré pour compiler automatiquement une application web Vite sous forme d'application mobile Android (APK) grâce à GitHub Actions.

## Ce qui a été configuré

J'ai créé un workflow GitHub Actions dans le fichier `.github/workflows/android-build.yml`. Voici ce qu'il fait, étape par étape, lorsqu'il est déclenché :

1.  **Récupération du code** : Il clone votre dépôt GitHub sur une machine virtuelle Linux (Ubuntu).
2.  **Configuration Node.js** : Il installe Node.js pour pouvoir gérer vos dépendances JavaScript.
3.  **Installation et Build Web** :
    *   Il lance `npm install` pour télécharger les modules de votre projet.
    *   Il lance `npm run build` (qui exécute Vite) pour compiler votre code web dans le dossier `dist/`.
4.  **Synchronisation Capacitor** : Il exécute `npx cap sync android`. Cette commande cruciale copie votre code web fraîchement compilé dans le projet natif Android (`android/app/src/main/assets/public`).
5.  **Configuration Java (JDK)** : Il installe Java (JDK 17), indispensable pour compiler du code Android avec Gradle.
6.  **Compilation de l'APK (Gradle)** :
    *   Il rend le script Gradle exécutable (`chmod +x gradlew`).
    *   Il lance la compilation de l'application en mode debug (`./gradlew assembleDebug`).
7.  **Sauvegarde du fichier** : Une fois la compilation terminée, l'APK est capturé par GitHub Actions et mis à disposition en tant qu'"Artifact".

## Ce que vous devez faire maintenant

Pour profiter de cette automatisation, voici les étapes à suivre :

1.  **Versionnez vos modifications :** Assurez-vous d'ajouter ces nouveaux fichiers à Git.
    ```bash
    git add .github/workflows/android-build.yml README.md
    git commit -m "Ajout du workflow GitHub Actions pour build l'APK"
    ```
2.  **Poussez sur GitHub :** Envoyez vos modifications sur votre dépôt distant.
    ```bash
    git push origin main
    ```
    *(Remplacez `main` par le nom de votre branche si nécessaire).*

3.  **Vérifiez l'exécution :**
    *   Allez sur la page de votre dépôt sur le site de **GitHub**.
    *   Cliquez sur l'onglet **Actions**.
    *   Vous devriez voir un workflow nommé "Android Build" en cours d'exécution.
    *   Une fois terminé (pastille verte), cliquez sur le build. Tout en bas de la page, dans la section **Artifacts**, vous trouverez un fichier nommé `app-debug`. Téléchargez-le, décompressez-le, et vous obtiendrez votre fichier `.apk` prêt à être installé sur un téléphone Android !

### Note sur les signatures
Ce workflow génère un APK de type "Debug", parfait pour tester sur votre propre appareil. Si vous souhaitez publier sur le Google Play Store plus tard, il faudra configurer un build "Release" qui nécessitera la gestion sécurisée de vos clés de signature (Keystore) via les "Secrets" de GitHub.
