package com.taskmaster.api.web.v1;

import com.taskmaster.api.web.v1.model.Person;
import com.taskmaster.service.ProjectMembersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/v1/projects/{projectId}/members")
@RequiredArgsConstructor
public class ProjectMembersController {


    private final ProjectMembersService projectMembersService;
    @GetMapping
    public List<Person> getAllMembers(@PathVariable UUID projectId) {
        return projectMembersService.getProjectMembers(projectId);
    }

    //TODO need an id only Req body
    @PostMapping
    public ResponseEntity<Void> addMember(@PathVariable UUID projectId, @RequestBody Person person) {
        projectMembersService.addMember(projectId, person.id());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity<Void> removeMember(@PathVariable UUID projectId, @PathVariable UUID memberId) {
        projectMembersService.removeMember(projectId, memberId);
        return ResponseEntity.noContent().build();
    }

}
