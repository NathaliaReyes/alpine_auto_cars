import React from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { Button } from "@/components/ui/button";  // Asegúrate de importar tu componente de botón correctamente

const FacebookIcon = () => (
    <Button
        onClick={() => window.open('https://www.facebook.com/alpineautosalesdurango/', '_blank')}
        className="w-12 h-12 flex items-center justify-center rounded bg-blue-500 hover:bg-blue-600"
    >
        <FaFacebookF className="text-white" />
    </Button>
);

export default FacebookIcon;