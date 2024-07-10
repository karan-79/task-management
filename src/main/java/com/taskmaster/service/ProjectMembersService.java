package com.taskmaster.service;

import com.taskmaster.api.web.v1.model.Person;
import com.taskmaster.domain.ProjectMembersDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProjectMembersService {

    private final ProjectMembersDAO projectMembersDAO;
    private final UsersService usersService;

    public List<Person> getProjectMembers(UUID projectId) {
        var members = projectMembersDAO.getProjectMembers(projectId);
        return usersService.getPersons(new HashSet<>(members));
    }

    public void addMember(UUID projectId, UUID personId) {
        projectMembersDAO.insertPerson(projectId, personId);
    }

    public void removeMember(UUID projectId, UUID personId) {
        projectMembersDAO.deletePerson(projectId, personId);
    }
}
