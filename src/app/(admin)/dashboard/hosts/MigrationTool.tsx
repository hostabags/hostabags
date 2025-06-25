"use client";

import { useState } from "react";
import { checkMigrationNeeded, migrateHostsToNewStructure } from "@/utils/migration";

export function MigrationTool() {
  const [isChecking, setIsChecking] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);
  const [needsMigration, setNeedsMigration] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleCheckMigration = async () => {
    setIsChecking(true);
    setMessage(null);
    
    try {
      const needs = await checkMigrationNeeded();
      setNeedsMigration(needs);
      setMessage(needs 
        ? "Se encontraron hosts que necesitan migración." 
        : "Todos los hosts ya tienen la estructura correcta."
      );
    } catch (error) {
      setMessage("Error al verificar la migración: " + (error as Error).message);
    } finally {
      setIsChecking(false);
    }
  };

  const handleMigrate = async () => {
    setIsMigrating(true);
    setMessage(null);
    
    try {
      await migrateHostsToNewStructure();
      setMessage("Migración completada exitosamente.");
      setNeedsMigration(false);
    } catch (error) {
      setMessage("Error durante la migración: " + (error as Error).message);
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '1rem', 
      margin: '1rem 0',
      borderRadius: '4px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>Herramienta de Migración</h3>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
        Esta herramienta migra hosts existentes a la nueva estructura donde cada host tiene su propio ID 
        y está vinculado a su propietario mediante el campo ownerId.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button 
          onClick={handleCheckMigration}
          disabled={isChecking}
          style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: isChecking ? 'not-allowed' : 'pointer'
          }}
        >
          {isChecking ? "Verificando..." : "Verificar Migración"}
        </button>
        
        {needsMigration && (
          <button 
            onClick={handleMigrate}
            disabled={isMigrating}
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: isMigrating ? 'not-allowed' : 'pointer'
            }}
          >
            {isMigrating ? "Migrando..." : "Ejecutar Migración"}
          </button>
        )}
      </div>
      
      {message && (
        <div style={{ 
          padding: '0.5rem', 
          backgroundColor: message.includes('Error') ? '#f8d7da' : '#d4edda',
          color: message.includes('Error') ? '#721c24' : '#155724',
          borderRadius: '4px',
          border: `1px solid ${message.includes('Error') ? '#f5c6cb' : '#c3e6cb'}`
        }}>
          {message}
        </div>
      )}
    </div>
  );
} 