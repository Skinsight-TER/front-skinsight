'use client';

import { DrawerComponent } from "@/components/Drawer";
import SwitchButton from "@/components/SwitchButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { SetStateAction, useState } from "react";
import Drive from "../../drive/page";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

interface FormData {
  pain: boolean;
  change: boolean;
  bodypart: string;
  messageIA: string;
  painScale: number;
  antecedent: boolean;
  otherInfos: string;
  patientAge: string;
  otherSymptoms: boolean;
  patientGender: string;
  currentTreatment: boolean;
  firstSymptomsAppearance: string;
  descriptionOtherSymptoms: string;
  currentTreatmentDescription: string;
  imageUrl: string;
}

interface Status {

}

export default function PreconsultationForm() {

  const { data: session } = useSession()

  const [submitionStatus, setSubmitionStatus] = useState('COMMING')
  const [isSelected, setIsSelected] = useState(false);
  const [location, setLocation] = useState('');
  const [since, setSince] = useState('');
  const [otherSymptoms, setOtherSymptoms] = useState(false);
  const [otherSymptomsDetails, setOtherSymptomsDetails] = useState('');
  const [pain, setPain] = useState(false);
  const [painScale, setPainScale] = useState(5);
  const [antecedent, setAntecedent] = useState(false);
  const [currentTreatment, setCurrentTreatment] = useState(false);
  const [treatmentDetails, setTreatmentDetails] = useState('');
  const [change, setChange] = useState(false);
  const [otherInfos, setOtherInfos] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleInputChange = (event: { target: { value: any; }; }, setState: (arg0: any) => void) => {
    setState(event.target.value);
  };

  const handleSwitchChange = (value: boolean, setValue: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) => {
    setValue(!value)
  }

  const handlePainScaleChange = (value: number) => {
    setPainScale(value);
  };

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const handleSubmit = async () => {
    const formData = {
      pain: pain,
      change: change,
      bodypart: location, // Suppose location refers to the body part
      messageIA: "",
      painScale: painScale,
      antecedent: antecedent,
      otherInfos: otherInfos,
      patientAge: "27", // Static for this example, replace with state if dynamic
      otherSymptoms: otherSymptoms,
      patientGender: "male", // Static for this example, replace with state if dynamic
      currentTreatment: currentTreatment,
      firstSymptomsAppearance: since,
      descriptionOtherSymptoms: otherSymptomsDetails,
      currentTreatmentDescription: treatmentDetails,
      imageUrl: imageUrl,
    };

    await submitForm(formData);
  };

  const submitForm = async (formData: FormData) => {
    try {
      const patientId = session?.user?.id
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/preconsultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify({
          status: submitionStatus,
          description: "une description",
          patientId: "1ed834fc-88bc-40ac-af3e-045c51359869",
          infoPatient: formData,
        })
      });

      if (res.ok) {
        setSubmitionStatus('approuved');
        console.log("Formulaire soumis avec succes");
      } else {
        setSubmitionStatus('denied');
        console.error("Erreur lors de la soumission du formulaire");
      }
    } catch (error) {
      console.error("Erreur de réseau ou de communication", error)
      setSubmitionStatus('denied');
    }
  }

  return(
    <div className="bg-light-green w-full">
      <div className="text-2xl my-5">Préconsultation #1</div>
      <div>

        <div className="flex justify-around">
          <div className="flex flex-col gap-4">
            <div>  
              <Label htmlFor="lieu" className="text-base">Sur quelle partie du corp est-ce ?</Label>
              <Input
                id="location"
                name="location"
                required
                value={location}
                onChange={event => handleInputChange(event, setLocation)}
                className="rounded-xl text-main-dark"
              />
            </div>
            <div>  
              <Label htmlFor="since" className="text-base">Depuis combien de temps est-il apparu ?</Label>
              <Input
                id="since"
                name="since"
                required
                value={since}
                onChange={event => handleInputChange(event, setSince)}
                className="rounded-xl text-main-dark"
              />
            </div>
            <div className="flex items-start">  
              <SwitchButton
                checked={otherSymptoms}
                onChange={() => handleSwitchChange(otherSymptoms, setOtherSymptoms)}
                label="Avez vous d'autres symptomes depuis son apprition ?"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="other-sympt" className="text-base">Si oui lesquels ?</Label>
              <Textarea 
                id="desc-otherSymptome"
                name="desc-otherSymptome"
                value={otherSymptomsDetails}
                onChange={event => handleInputChange(event, setOtherSymptomsDetails)}
              />
            </div>
            <div className="flex items-start">  
              <SwitchButton
                checked={pain}
                onChange={() => handleSwitchChange(pain, setPain)}
                label="Avez vous des douleurs à cet endroit ?"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="scale" className="text-base">Sur quel échelle est la douleur ?</Label>
              <DrawerComponent onPainScaleChange={handlePainScaleChange} currentScale={painScale} />
            </div>
          </div>
          <Separator orientation="vertical" className="bg-gray-600"/>
          <div>
            <div>
              <SwitchButton
                checked={antecedent}
                onChange={() => handleSwitchChange(antecedent, setAntecedent)}
                label="Avez-vous des antécédents de cancer dans votre famille ?" 
              />
            </div>
            <div>
              <SwitchButton
                checked={currentTreatment}
                onChange={() => handleSwitchChange(currentTreatment, setCurrentTreatment)}
                label="Suivez-vous un traitement actuellement ?" 
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="other-sympt" className="text-base">Lesquels ? (precisez la fréquence de votre prise de médicament)</Label>
              <Textarea 
                id="treatment-details"
                name="treatment-detail"
                value={treatmentDetails}
                onChange={event => handleInputChange(event, setTreatmentDetails)}
              />
            </div>
            <div>
              <SwitchButton
                checked={change}
                onChange={() => handleSwitchChange(change, setChange)}
                label="Avez-vous constaté un changement (taille, couleur, ...) depuis son apparition ?" 
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="other-sympt" className="text-base">Avez-vous d'autres remarques à remonter ?</Label>
              <Textarea 
                id="other-infos"
                name="other-infos"
                value={otherInfos}
                onChange={event => handleInputChange(event, setOtherInfos)}
              />
            </div>
          </div>
        </div>
        <div className="my-4">
          <Drive onImageUpload={handleImageUpload} />
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={handleSubmit} className="rounded-xl bg-main-green text-2xl">Valider ma préconsultation</Button>
      </div>
    </div>
  )
}