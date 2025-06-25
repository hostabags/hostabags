"use client";

import Header from "@/components/layout/header/Header";
import useAuth from "@/hooks/useAuth";

const HostPage = () => {
  const { role } = useAuth();

  if (role !== "host") {
    return (
      <>
        <Header />
        <main>
          <p>No tienes acceso a este contenido, solo para hosts</p>;
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <h1>Host profile page</h1>
        <div>Aqui tienen que ir los mensajes y notificaciones</div>
        <div>Aqui todos los datos del host</div>
        <div>Aqui toda la informacion de las reservas</div>
        <div>Aqui todos los datos de ingresos recibidos y comisiones</div>
      </main>
    </>
  );
};

export default HostPage;
