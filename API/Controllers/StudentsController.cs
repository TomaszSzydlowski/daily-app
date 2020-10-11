using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using netCoreMongoDbApi.Resources;
using netCoreMongoDbApi.Domain.Models;
using netCoreMongoDbApi.Domain.Services;
using System;

namespace netCoreMongoDbApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class StudentsController : Controller
    {
        private readonly IStudentService _studentService;

        private readonly IMapper _mapper;

        public StudentsController(IStudentService studentService, IMapper mapper)
        {
            _studentService = studentService;
            _mapper = mapper;
        }

        //GET:api/students
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Student>), 200)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> ListAsync()
        {
            var result = await _studentService.ListAsync();

            if (!result.Success)
                return BadRequest(new ErrorResource(result.Message));

            var studentsResource = _mapper.Map<IEnumerable<Student>, IEnumerable<StudentResource>>(result.Students);

            return Ok(studentsResource);
        }

        //GET:api/students/id
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(IEnumerable<Student>), 200)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> FindAsync(int id)
        {
            var result = await _studentService.FindAsync(id);

            if (!result.Success)
                return BadRequest(new ErrorResource(result.Message));

            var studentResource = _mapper.Map<Student, StudentResource>(result.Student);
            return Ok(studentResource);
        }

        //POST:api/students
        [HttpPost]
        [ProducesResponseType(typeof(StudentResource), 200)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> PostAsync([FromBody] SaveStudentResource resource)
        {
            var student = _mapper.Map<SaveStudentResource, Student>(resource);
            var result = await _studentService.AddAsync(student);

            if (!result.Success)
                return BadRequest(new ErrorResource(result.Message));

            var studentResource = _mapper.Map<Student, StudentResource>(result.Student);
            return Ok(studentResource);
        }

        // Put: api/students/id
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(StudentResource), 201)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] SaveStudentResource resource)
        {
            var student = _mapper.Map<SaveStudentResource, Student>(resource);
            student.Id=id;
            var result = await _studentService.UpdateAsync(student);

            if (!result.Success)
                return BadRequest(new ErrorResource(result.Message));

            var studentsResource = _mapper.Map<Student, StudentResource>(result.Student);
            return Ok(studentsResource);
        }

        // DELETE: api/students/id
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(StudentResource), 200)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var result = await _studentService.DeleteAsync(id);

            if (!ModelState.IsValid)
                return BadRequest(new ErrorResource(result.Message));

            var studentsResource = _mapper.Map<Student, StudentResource>(result.Student);
            return Ok(studentsResource);
        }

        // DELETE: api/students
        [HttpDelete]
        [ProducesResponseType(typeof(StudentResource), 200)]
        [ProducesResponseType(typeof(ErrorResource), 400)]
        public async Task<IActionResult> DeleteAllAsync()
        {
            var result = await _studentService.DeleteAllAsync();

            if (!ModelState.IsValid)
                return BadRequest(new ErrorResource(result.Message));

            var studentsResource = _mapper.Map<IEnumerable<Student>, IEnumerable<StudentResource>>(result.Students);
            return Ok(studentsResource);
        }
    }
}