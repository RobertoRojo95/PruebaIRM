using Api_IRM.DataAccess;
using Api_IRM.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Text.Json;
using Newtonsoft.Json.Linq;

namespace Api_IRM.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MasivoController : ControllerBase
    {

        ContactoAccess acceso = new ContactoAccess();

        [HttpPost]
        public String Post([FromBody] Object value)
        {
            string serializedObject = System.Text.Json.JsonSerializer.Serialize(value);
            List<Contacto> c = ParseContactoArray(serializedObject);
            List<Contacto> lista = new List<Contacto>();
            foreach (Contacto con in c)
            {
                lista = acceso.agregarContacto(con);
            }

          

            return JsonConvert.SerializeObject(lista);


        }
        public List<Contacto> ParseContactoArray(string json)
        {
            JArray jArray = Newtonsoft.Json.Linq.JArray.Parse(json);
            List<Contacto> lista = new List<Contacto>();
            for (int i = 0; i < jArray.Count; i++)
            {
                JObject jObject = JObject.Parse(jArray[i].ToString());
                Contacto c = new Contacto();
                c.NombreCompleto = (string)jObject["NombreCompleto"];
                c.Direccion = (string)jObject["Direccion"];
                c.Telefono = (string)jObject["Telefono"];
                c.CURP = (string)jObject["CURP"];
                lista.Add(c);
            }
            


            return lista;
        }
    }
}
