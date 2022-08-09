export enum Permission {
  Admin = 'admin',
  FindUsers = 'find:users',
  FindUser = 'find:user',
  UpdateUser = 'update:user',
  // DeleteUser = 'delete:user',

  // Roles
  FindRoles = 'find:roles',
  FindRole = 'find:role',
  CreateRole = 'create:role',
  UpdateRole = 'update:role',
  DeleteRole = 'delete:role',
  PostRoleAddPermissions = 'post:role_add_permissions',

  // Permissions
  FindPermissions = 'find:permissions',
  FindPermission = 'find:permission',
  CreatePermission = 'create:permission',
  UpdatePermission = 'update:permission',
  DeletePermission = 'delete:permission',
}
