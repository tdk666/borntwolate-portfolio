import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { photos } from '../../data/photos'; // On importe ton catalogue officiel
import { stockService } from '../../services/stock';

const CertificateGenerator = () => {
    // On ne tape plus le titre à la main, on sélectionne un ID de photo
    const [selectedPhotoId, setSelectedPhotoId] = useState<number | string>("");

    const [clientName, setClientName] = useState('');
    const [editionNumber, setEditionNumber] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [feedback, setFeedback] = useState<{ msg: string, type: 'success' | 'error' } | null>(null);
    const [loading, setLoading] = useState(false);

    // Fonction pour trouver la photo sélectionnée
    const currentPhoto = photos.find(p => p.id === Number(selectedPhotoId)) || photos.find(p => p.title === selectedPhotoId);

    // Fonction utilitaire pour retrouver le slug (MÊME LOGIQUE QUE SUPABASE)
    const getSlug = (photo: any) => {
        // Si tu as ajouté une propriété slug dans photos.ts, utilise-la.
        // Sinon, on la génère à la volée comme dans le script SQL :
        // Exemple simple de mapping manuel ou génération :
        const title = photo.title.toLowerCase();
        if (title.includes("vespa") || title.includes("libertà")) return "liberta-bianca";
        if (title.includes("heure bleue")) return "l-heure-bleue";
        // ... Par défaut on nettoie le titre
        return title
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/['’]/g, "-")
            .replace(/ /g, "-")
            .replace(/-+/g, "-");
    };

    const handleUpdateStock = async () => {
        if (!currentPhoto) return;

        setLoading(true);
        setFeedback(null);

        // On calcule le slug précis attendu par Supabase
        const slug = getSlug(currentPhoto);
        console.log("Tentative mise à jour stock pour slug:", slug);

        const { success, error } = await stockService.incrementStock(slug);

        if (success) {
            setFeedback({ msg: `✅ Stock mis à jour pour "${currentPhoto.title}" (+1 vendu)`, type: 'success' });
        } else {
            setFeedback({ msg: `❌ Erreur : ${error}. Vérifiez que le slug "${slug}" existe dans Supabase.`, type: 'error' });
        }
        setLoading(false);
    };

    const generatePDF = () => {
        if (!currentPhoto) {
            alert("Veuillez sélectionner une œuvre.");
            return;
        }
        const doc = new jsPDF({ orientation: 'landscape' });

        // Design Simple et Élégant
        doc.setFont("helvetica", "normal");

        // Titre
        doc.setFontSize(24);
        doc.text("CERTIFICAT D'AUTHENTICITÉ", 148, 40, { align: 'center' });

        // Ligne
        doc.setLineWidth(0.5);
        doc.line(50, 45, 246, 45);

        // Détails de l'oeuvre (Remplis automatiquement)
        doc.setFontSize(14);
        doc.text(`Artiste : Théophile Dequecker`, 148, 70, { align: 'center' });
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text(`"${currentPhoto.title}"`, 148, 85, { align: 'center' });

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Série : ${currentPhoto.series}`, 148, 95, { align: 'center' });

        // Détails techniques
        doc.text(`Format & Finition : _________________________________`, 148, 120, { align: 'center' });
        doc.text(`Papier : Canson Infinity Platine Fibre Rag 310g`, 148, 130, { align: 'center' });

        // Numérotation
        doc.setFontSize(16);
        doc.text(`Édition N° ${editionNumber} / 30`, 148, 150, { align: 'center' });

        // Client et Date
        doc.setFontSize(12);
        doc.text(`Acquis par : ${clientName}`, 60, 170);
        doc.text(`Fait à Paris, le : ${date}`, 200, 170, { align: 'right' });

        // Signature
        doc.text("Signature de l'artiste :", 200, 185, { align: 'right' });

        doc.save(`Certificat_${currentPhoto.title.replace(/ /g, '_')}_${clientName}.pdf`);
    };

    return (
        <div className="min-h-screen bg-neutral-100 p-8 flex flex-col items-center">
            <div className="max-w-2xl w-full bg-white p-8 shadow-xl rounded-sm">
                <h1 className="text-2xl font-light tracking-widest text-center mb-8 uppercase">Admin : Certificats & Stocks</h1>

                <div className="space-y-6">

                    {/* SÉLECTEUR INTELLIGENT (Plus de fautes de frappe) */}
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Sélectionner l'Œuvre</label>
                        <select
                            value={selectedPhotoId}
                            onChange={(e) => setSelectedPhotoId(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-sm focus:border-black outline-none"
                        >
                            <option value="">-- Choisir une photo --</option>
                            {photos.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.title} ({p.series})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Numéro d'édition</label>
                            <input
                                type="text"
                                placeholder="Ex: 1"
                                value={editionNumber}
                                onChange={(e) => setEditionNumber(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Nom du Collectionneur</label>
                            <input
                                type="text"
                                placeholder="Jean Dupont"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-sm"
                            />
                        </div>
                    </div>

                    {/* ZONE DANGER : GESTION DE STOCK */}
                    <div className="bg-gray-50 p-4 border border-gray-200 mt-8">
                        <h3 className="text-sm font-bold mb-2">📦 GESTION DES STOCKS (SUPABASE)</h3>
                        <p className="text-xs text-gray-500 mb-4">
                            Cliquez ici uniquement quand la vente est confirmée et payée. Cela retirera 1 exemplaire du stock mondial.
                        </p>

                        <button
                            onClick={handleUpdateStock}
                            disabled={loading || !currentPhoto}
                            className={`w-full py-3 px-4 text-white font-bold text-sm tracking-widest transition-colors
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}
              `}
                        >
                            {loading ? 'MISE À JOUR...' : 'VALIDER LA VENTE (+1 VENDU)'}
                        </button>

                        {feedback && (
                            <div className={`mt-3 p-2 text-center text-sm ${feedback.type === 'success' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                                {feedback.msg}
                            </div>
                        )}
                    </div>

                    <div className="border-t pt-6 mt-6">
                        <button
                            onClick={generatePDF}
                            className="w-full bg-black text-white py-4 hover:bg-gray-800 transition-colors uppercase tracking-widest text-sm"
                        >
                            Générer le PDF
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CertificateGenerator;
