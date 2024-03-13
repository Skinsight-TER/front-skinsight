import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function PreconsultationInProgress() {

  const dataPreconsultation = [
    {
        nom: 'Consultation 1',
        date: '2023-03-13',
        medecinGeneraliste: 'Dr. Léa Moreau',
        dermatologue: 'Dr. Émile Durand',
        document: 'Rapport_visite_2023-03-01.pdf',
        status: 'Validé',
    },
    {
        nom: 'Consultation 2',
        date: '2023-03-14',
        medecinGeneraliste: 'Dr. Hugo Bernard',
        dermatologue: 'Dr. Alice Mercier',
        document: 'Rapport_visite_2023-03-02.pdf',
        status: 'En attente'
    },
    {
        nom: 'Consultation 3',
        date: '2023-03-03',
        medecinGeneraliste: 'Dr. Jules Lemoine',
        dermatologue: 'Dr. Clara Dupuis',
        document: 'Rapport_visite_2023-03-03.pdf',
        status: 'Rejeté'
    },
    {
      nom: 'Consultation 4',
      date: '2023-03-03',
      medecinGeneraliste: 'Dr. Jules Lemoine',
      dermatologue: 'Dr. Clara Dupuis',
      document: 'Rapport_visite_2023-03-03.pdf',
      status: 'Rejeté'
  },
  {
    nom: 'Consultation 5',
    date: '2023-03-03',
    medecinGeneraliste: 'Dr. Jules Lemoine',
    dermatologue: 'Dr. Clara Dupuis',
    document: 'Rapport_visite_2023-03-03.pdf',
    status: 'Rejeté'
  },
    // Ajoutez d'autres éléments selon vos besoins
];

return (
  <div>
    <div className="text-2xl mt-10 ml-5">Préconsultation</div>
    <div className="flex justify-start items-center gap-2 my-10 mx-5">
        <Label htmlFor="show-passed">Affciher les préconsultation passés</Label>
        <Switch id="show-passed"/>
    </div>
    <div className="flex flex-col items-center justify-center w-full">
        <div className="bg-dark-green w-[70vw] my-5 mx-5 rounded-xl">
            <div className="flex justify-between my-5 mx-6">
                <div>Nom</div>
                <div>Date</div>
                <div>Médecin Généraliste</div>
                <div>Dermathologie</div>
                <div>Documents</div>
                <div>Status</div>
            </div>
            {dataPreconsultation.map((item, index) => (
                <div key={index} className="flex justify-between">
                    <div>{item.nom}</div>
                    <div>{item.date}</div>
                    <div>{item.medecinGeneraliste}</div>
                    <div>{item.dermatologue}</div>
                    <div>Photo</div>
                    <div>{item.status}</div>
                </div>
            ))}
        </div>  
    </div>
  </div>
);


}

{/* <table className="min-w-full mx-10 my-2 rounded-lg">
                <thead className="bg-dark-green text-white rounded-lg">
                    <tr>
                        <th className="px-6 py-3 text-center leading-4 tracking-wider rounded-tl-lg">Nom</th>
                        <th className="px-6 py-3 text-center leading-4 tracking-wider">Date</th>
                        <th className="px-6 py-3 text-center leading-4 tracking-wider">Médecin Généraliste</th>
                        <th className="px-6 py-3 text-center leading-4 tracking-wider">Dermathologue</th>
                        <th className="px-6 py-3 text-center leading-4 tracking-wider">Documents</th>
                        <th className="px-6 py-3 text-center leading-4 tracking-wider rounded-tr-lg">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-200">
                    {dataPreconsultation.map((item, index) => (
                        <tr key={index} className="bg-light-green2">
                            <td className="px-6 py-4 whitespace-no-wrap">{item.nom}</td>
                            <td className="px-6 py-4 whitespace-no-wrap">{item.date}</td>
                            <td className="px-6 py-4 whitespace-no-wrap">{item.medecinGeneraliste}</td>
                            <td className="px-6 py-4 whitespace-no-wrap">{item.dermatologue}</td>
                            <td className="px-6 py-4 whitespace-no-wrap">
                                <div className="flex items-center">
                                    <div className="text-sm leading-5 text-gray-900">Photos</div>
                                    <div className="ml-4">
                                        <div className="text-sm leading-5 text-teal-500">
                                            ✔️
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'Validé' ? 'bg-blue-100 text-green-800' : item.status === 'En attente' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}