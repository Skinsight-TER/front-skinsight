'use client';

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

function getCurrentDateFormatted() {
    const now = new Date();
    const year = now.getFullYear();
    // getMonth() retourne un mois de 0 (janvier) à 11 (décembre), donc ajoutez 1 pour obtenir le format correct
    // PadStart(2, '0') assure que le mois et le jour sont toujours au format à deux chiffres
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');

    // Assemble la date dans le format YYYY-MM-DD
    return `${year}-${month}-${day}`;
}

export default function PreconsultationInProgress() {

  const dataPreconsultation = [
    {
        nom: 'Consultation 1',
        date: '2024-03-17',
        medecinGeneraliste: 'Dr. Léa Moreau',
        dermatologue: 'Dr. Émile Durand',
        document: 'Rapport_visite_2023-03-01.pdf',
        status: 'Validé',
    },
    {
        nom: 'Consultation 2',
        date: '2024-03-18',
        medecinGeneraliste: 'Dr. Hugo Bernard',
        dermatologue: 'Dr. Alice Mercier',
        document: 'Rapport_visite_2023-03-02.pdf',
        status: 'En attente'
    },
    {
        nom: 'Consultation 3',
        date: '2024-03-19',
        medecinGeneraliste: 'Dr. Jules Lemoine',
        dermatologue: 'Dr. Clara Dupuis',
        document: 'Rapport_visite_2023-03-03.pdf',
        status: 'En attente'
    },
    {
    nom: 'Consultation 4',
    date: '2024-03-03',
    medecinGeneraliste: 'Dr. Jules Lemoine',
    dermatologue: 'Dr. Clara Dupuis',
    document: 'Rapport_visite_2023-03-03.pdf',
    status: 'Rejeté'
    },
    {
    nom: 'Consultation 5',
    date: '2024-03-03',
    medecinGeneraliste: 'Dr. Jules Lemoine',
    dermatologue: 'Dr. Clara Dupuis',
    document: 'Rapport_visite_2023-03-03.pdf',
    status: 'Rejeté'
    },
    // Ajoutez d'autres éléments selon vos besoins
];

const [showPassed, setShowPassed] = useState(false);
const currentDate = getCurrentDateFormatted();
const dateToString = currentDate.toString();

// const hasPassedPreconsultations = dataPreconsultation.some(item => new Date(item.date) < new Date(currentDate));

// const containerStyle = hasPassedPreconsultations && showPassed ? "bg-light-green2" : "bg-main-green";

const displayedPreconsultations = dataPreconsultation.filter(item => {
    const itemDate = new Date(item.date);
    return showPassed || itemDate >= new Date(currentDate);
});

const isPassed = (date: string | Date) => {
    return new Date(date) < new Date(currentDate);
};

return (
    <div className="w-full">
    <div className="text-2xl mt-10 ml-5">Préconsultation</div>
    <div className="flex justify-start items-center gap-2 my-10 mx-5">
        <Label htmlFor="show-passed">Afficher les préconsultations passées</Label>
        <Switch id="show-passed" checked={showPassed} onCheckedChange={() => setShowPassed(!showPassed)}/>
    </div>
    <div className="flex flex-col items-center justify-center w-full">
        <div className="bg-dark-green w-[70vw] mt-5 mx-5 rounded-t-xl">
            <div className="grid grid-cols-6 gap-4 my-5 mx-6 text-center">
                <div>Nom</div>
                <div>Date</div>
                <div>Médecin Généraliste</div>
                <div>Dermatologie</div>
                <div>Documents</div>
                <div>Status</div>
            </div>
        </div>
        <div className="bg-light-green2 w-[70vw] rounded-b-xl">
        {displayedPreconsultations.map((item, index) => {
            if (!showPassed) {
                item.status == "Passé";
            }
            return (
                <div key={index} className="grid grid-cols-6 gap-4 my-5 mx-6 text-center">
                    <div>{item.nom}</div>
                    <div>{item.date}</div>
                    <div>{item.medecinGeneraliste}</div>
                    <div>{item.dermatologue}</div>
                    <div>Photo</div>
                    <div>{isPassed(item.date) ? "Passé" : item.status}</div>
                </div>
            )
        })}
        </div>
    </div>
    </div>
);

}
