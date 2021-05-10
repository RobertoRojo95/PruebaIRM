using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_IRM.Model
{
    public class Contacto
    {
        public int Id { get; set; }

        public String NombreCompleto { get; set; }

        public String Direccion { get; set; }

        public String Telefono { get; set; }

        public String CURP { get; set; }

        public DateTime FechaRegistro { get; set; }

        public bool Activo { get; set; }
    }
}
