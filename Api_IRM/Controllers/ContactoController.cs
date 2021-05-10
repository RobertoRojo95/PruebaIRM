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


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api_IRM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController : ControllerBase
    {
        // GET: api/<ValuesController>
        ContactoAccess acceso = new ContactoAccess();
        [HttpGet]
        public String Get()
        {
            List<Contacto> lista = new List<Contacto>();

            lista = acceso.getContactos();

            return JsonConvert.SerializeObject(lista);
        }

        // POST api/<ValuesController>

        [HttpPost]

        public String Post([FromBody] Object value)
        {
            string serializedObject = System.Text.Json.JsonSerializer.Serialize(value);
            Contacto c = ParseContacto(serializedObject);
            List<Contacto> lista = new List<Contacto>();
            lista = acceso.agregarContacto(c);

            return JsonConvert.SerializeObject(lista);


        }

        [HttpPost]
        [ActionName("Masivo")]
        public String PostMasivo([FromBody] Object value)
        {
            //string serializedObject = System.Text.Json.JsonSerializer.Serialize(value);
            //Contacto c = ParseContacto(serializedObject);
            //List<Contacto> lista = new List<Contacto>();
            //lista = acceso.agregarContacto(c);

            //return JsonConvert.SerializeObject(lista);
            return "hello";


        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public String Put(int id,[FromBody] Object value)
        {
            //int tId = Int32.Parse(id);
            string serializedObject = System.Text.Json.JsonSerializer.Serialize(value);
            Contacto c = ParseContacto(serializedObject);
            List<Contacto> lista = new List<Contacto>();
            lista = acceso.editarContacto(id,c);

            return JsonConvert.SerializeObject(lista);
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public String Delete(int id)
        {
            List<Contacto> lista = new List<Contacto>();
            lista = acceso.borrarContacto(id);

            return JsonConvert.SerializeObject(lista);
        }


        public Contacto ParseContacto(string json)
        {
            JObject jObject = Newtonsoft.Json.Linq.JObject.Parse(json);
            Contacto c = new Contacto();
            c.NombreCompleto = (string)jObject["NombreCompleto"];
            c.Direccion = (string)jObject["Direccion"];
            c.Telefono = (string)jObject["Telefono"];
            c.CURP = (string)jObject["CURP"];


            return c;
        }
    }
}
