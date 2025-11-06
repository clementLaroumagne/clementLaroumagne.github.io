# Fichier de données

Le fichier `data.json` contient toutes les données du portfolio. Vous pouvez le modifier facilement pour mettre à jour :

- **about** : Les sections "À propos" avec leurs images et textes
- **productions** : La liste de toutes vos productions
  - `isDemoReel: true` pour mettre en avant le démo-reel
  - `type` : Le type de production (3D, Vidéos, Photographies, 2D, etc.)
- **contact** : Vos informations de contact

## Structure

```json
{
  "about": {
    "sections": [
      {
        "image": "/images/about1.jpg",
        "text": "Votre texte ici..."
      }
    ]
  },
  "productions": [
    {
      "id": "unique-id",
      "type": "3D",
      "title": "Titre",
      "description": "Description...",
      "image": "/images/production.jpg",
      "link": "https://...",
      "isDemoReel": false
    }
  ],
  "contact": {
    "email": "votre@email.com",
    "phone": "06 12 34 56 78",
    "linkedin": "https://linkedin.com/..."
  }
}
```

## Images

Placez vos images dans le dossier `public/images/` et référencez-les avec `/images/nom-image.jpg` dans le JSON.

