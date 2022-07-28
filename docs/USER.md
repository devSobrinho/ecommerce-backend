  # ALL USERS  
  
  **RF**
    - Deve ser possivel listar todos os usuarios.
    - Deve ser possivel listar todos os usuarios pelo nome da role.

  **RNF**

  **RN**
    - O usuário deve estar logado no sistema.
    - O usuário responsavel pela listagem deve ser um usuário de role administrator ou ter a permissão "list_users".
    
  
  # SHOW USER  
  
  **RF**
    - Deve ser possivel buscar o usuario pelo id.
    - Deve ser possivel buscar o usuario pelo email.
    - Deve ser possivel buscar o usuario pelo id da account.

  **RN**
    - O usuário deve estar logado no sistema.
    - O usuário responsavel pela listagem deve ser um usuário de role administrator ou ter a permissão "search_user".


  # CREATE USER  
  
  **RF**
    - Deve ser possivel um novo usuario.

  **RN**
    - O usuário não deve estar logado no sistema.
    - Deve ser enviado email e password.
    - O usuário deve cadastrar se o email não for já cadastrado e ser um email válido. Caso já exista, deve exibir um erro 400 com a messagem: "Este email ja é cadastrado no sistema" e caso o email seja invalido deve exibir o erro com a messagem: "Este email é inválido".
    - A password deve conter no minimo 8 caracteres e no máximo 20 caracteres. Caso a senha não seja valida deve exibir um erro 400 com a messagem: "A senha deve conter entre 8 a 20 caracteres".
    - Todo usuário cadastrado deve ter por default a role de consumer.


  # UPDATE USER  
  
  **RF**
    - Deve ser possivel atualizar o user.

  **RN**
    - O usuário deve estar logado no sistema.
    - O usuário pode atualizar apenas o email e password.
    - O usuário so pode atualizar o email se o email enviado não possuir cadastrado. Caso contrario.
    - O usuário não deve atualizar o email se ele já for cadastrado. Caso já exista deve exibir um erro 400 com a messagem: "Este email ja é cadastrado no sistema".




# ALL ROLES  
  
  **RF**
    - Deve ser possivel listar todos as roles.

  **RN**
    - O usuário deve estar logado no sistema.
    - O usuário responsavel pela listagem deve ser um usuário de role administrator ou moderator. Caso não seja um usuario com essa role, deve exibir um erro 403 com a messagem: "Usuário sem permissão".
    
  
# CREATE ROLE 
  
  **RF**
    - Deve ser possivel criar uma nova role.

  **RN**
    - O usuário deve estar logado no sistema.
    - O usuário responsavel pela criação de role deve ser um usuário de role administrator ou moderator. Caso não seja um usuario com essa role, deve exibir um erro 403 com a messagem: "Usuário sem permissão".
    - Deve ser enviado o name, description e users.
    - o BuiltIn por default deve ser false. Caso a role do usuario seja administrador sera possivel enviar o BuiltIn como true.
    - Deve enviar permissions existentes para associar na role. Caso a permission não exista deve exibir um erro 404 com a messagem: "Permission inexistente".
    - Deve enviar users existentes. Caso não exista user, deve exibir um erro 404 com a messagem "User inexistente"


# UPDATE ROLE 
  
  **RF**
    - Deve ser possivel atualizar uma role.

  **RN**
    - O usuário deve estar logado no sistema.
    - O usuário responsavel pela atualização da role deve ser um usuário de role administrator ou moderator que criou a role. Caso não seja um usuario com essa role ou não seja o moderador que criou a role, deve exibir um erro 403 com a messagem: "Usuário sem permissão".
    - Pode ser enviado o name, description e users. O name tem que ser único e os users devem existir, caso o name da role já esteja cadastrado deve enviar um erro 400 com a message: "Já existe um name de role cadastrada". Caso não exista users deve exibir um erro 404 com a messagem "User inexistente".

# DELETE ROLE 

  **RF**
    - Deve ser possivel deletar a role.

  **RN**
    - O usuário deve estar logado no sistema.
    - O usuário responsavel para deletar a role deve ser um usuario de role administrator. Caso não seja um usuario com a role de adminitrator deve exibir um erro 403 e com uma messagem: "Usuario sem permissão".


# ALL PERMISSION

  **RF**
    - Deve ser possivel listar as permissions.

  **RN**
    - O usuário deve estar logado no sistema.

# CREATE PERMISSION

  **RF**
    - Deve ser possivel criar permission.

  **RN**
    - O usuário deve estar logado no sistema.
    - O usuário deve ter a role de administrador. Caso não seja, deve exibir um erro 403 e com a messagem: "Usuário sem permissão".
    - Deve enviar o name, description e opcionalmente roles_id. Caso o name ja exista deve exibir um erro 404 e com a messagem: "Nome da permission já existe".

# UPDATED PERMISSION

  **RF**
    - Deve ser possivel atualizar permission.

  **RN**
    - O usuário deve estar logado no sistema.
    - O usuário deve ter a role de administrador. Caso não seja, deve exibir um erro 403 e com a messagem: "Usuário sem permissão".
    - Deve enviar o name, description e opcionalmente roles_id. Caso o name ja exista deve exibir um erro 404 e com a messagem: "Nome da permission já existe".

# DELETE PERMISSION

  **RF**
    - Deve ser possivel deletar permission.

  **RN**
    - O usuário deve estar logado no sistema.
    - O usuário deve ter a role de administrador.