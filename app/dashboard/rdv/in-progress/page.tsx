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

function daysUntilRdv(rdvDate: string | Date) {
  const today = new Date(getCurrentDateFormatted());
  const rdv = new Date(rdvDate);
  const differenceInTime = rdv.getTime() - today.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
}

export default function rdvInProgress() {

  const dataRdv = [
    {
      date: '2024-03-20',
      medecinGeneraliste: 'Dr. Léa Moreau',
      status: 'Validé',
    },
    {
      date: '2024-03-05',
      medecinGeneraliste: 'Dr. Léa Moreau',
      status: 'Passé',
    },
    {
      date: '2024-03-10',
      medecinGeneraliste: 'Dr. Léa Moreau',
      status: 'passé',
    },
    // Ajoutez d'autres éléments selon vos besoins
];

const [showPassed, setShowPassed] = useState(false);
const currentDate = getCurrentDateFormatted();

const displayedRdv = dataRdv.filter(item => {
    const itemDate = new Date(item.date);
    return showPassed || itemDate >= new Date(currentDate);
});

const isPassed = (date: string | Date) => {
    return new Date(date) < new Date(currentDate);
};

return (
    <div className="w-full">
    <div className="text-2xl mt-10 ml-5">Rendez-vous</div>
    <div className="flex justify-start items-center gap-2 my-10 mx-5">
        <Label htmlFor="show-passed">Afficher les rendez-vous passées</Label>
        <Switch id="show-passed" checked={showPassed} onCheckedChange={() => setShowPassed(!showPassed)}/>
    </div>
    <div className="flex flex-col items-center justify-center w-full">
        <div className="w-full">
        {displayedRdv.map((item, index) => {
            if (!showPassed) {
                item.status == "Passé";
            }
            const itemDatePassed = isPassed(item.date);
            const itemStyle = itemDatePassed ? "bg-light-green2" : "bg-main-green";
            const daysUntil = daysUntilRdv(item.date)

            return (
                <div key={index} className={`flex flex-row justify-between ${itemStyle} gap-4 my-5 mx-6 py-5 text-center rounded-xl`}>
                    <div className="ml-20">{item.date}</div>
                    <div>{item.medecinGeneraliste}</div>
                    <div className="mr-20">{isPassed(item.date) ? "Passé" : `${daysUntil} jour(s) avant`}</div>
                </div>
            )
        })}
        </div>
    </div>
    </div>
);

}
