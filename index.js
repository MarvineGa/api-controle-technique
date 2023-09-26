async function telechargerFichierJson(departement) {
    return new Promise((resolve, reject) => {
      const token = "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";
  
      const options = {
        hostname: 'raw.githubusercontent.com',
        path: obtenirUrlFichierJson(departement),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const request = https.request(options, (response) => {
        let fileData = '';
  
        response.on('data', (chunk) => { fileData += chunk; });
  
        response.on('end', () => {
          if (response.statusCode === 200) {
            try {
                const donnees = JSON.parse(fileData);

                const regroupedObjects = getByCommune(donnees);
                resolve(regroupedObjects);

            } catch(error) {
                console.error('Erreur lors du parsing du fichier JSON :', error);
                reject(error);
            }
        } else {
            console.error('Échec du téléchargement du fichier :', response.statusCode);
            reject(new Error(`Échec du téléchargement du fichier : ${response.statusCode}`));
          }
        });
      });
  
      request.on('error', (err) => {
        console.error('Erreur lors de la requête :', err.message);
        reject(err);
      });
  
      request.end();
    });
}
