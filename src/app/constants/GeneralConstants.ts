export class GeneralConstants {
  static NOTA_ANULADA = -2;

    static CRUD_OPERATIONS = {
        READ : 0,
        INSERT : 1,
        UPDATE : 2,
        INSERT_OR_UPDATE : 3,
        DELETE : 4,
        GET : 5,
    }

    static TIPOS_BOLSAS = {
      INTERNA : {code : 0, info : 'Interna'},
      EXTERNA : {code : 1, info : 'Externa'},
      getType : function(){
        return 'TIPOS_BOLSAS';
      },
      toArray : function()  {
        return [
          GeneralConstants.TIPOS_BOLSAS.INTERNA,
          GeneralConstants.TIPOS_BOLSAS.EXTERNA
        ]
      },
      getInfo : function(code){
        return GeneralConstants.TIPOS_BOLSAS.toArray().filter(p => p.code == code).pop().info
      }
    }

    static USERS_PERFIS = {
      ADMINISTRADOR : {code : 0, info : 'Administrador'},
      IMPRESSORA : {code : 1, info : 'Impressão de Fichas'},
      REGISTO_UTENTE : {code : 2, info : 'Registo de Utentes'},
      REGISTO_CANDIDATO : {code : 3, info : 'Registo de Candidato'},
      PROFESSOR : {code : 4, info : 'Professor'},
      PROFESSOR_SUPERVISOR : {code : 5, info : 'Professor Supervisor'},
      toArray : function()  {
        return [
          GeneralConstants.USERS_PERFIS.ADMINISTRADOR,
          GeneralConstants.USERS_PERFIS.IMPRESSORA,
          GeneralConstants.USERS_PERFIS.REGISTO_UTENTE,
          GeneralConstants.USERS_PERFIS.REGISTO_CANDIDATO,
          GeneralConstants.USERS_PERFIS.PROFESSOR,
          GeneralConstants.USERS_PERFIS.PROFESSOR_SUPERVISOR
        ]
      },
      getInfo : function(code){
        return GeneralConstants.USERS_PERFIS.toArray().filter(p => p.code == code).pop().info
      }
    }

    static USERS_ESTADOS = {
      DESACTIVADO : {code : 0, info : 'Desactivado'},
      ACTIVADO : {code : 1, info : 'Activado'},
      toArray : function()  {
        return [
          GeneralConstants.USERS_ESTADOS.ACTIVADO,
          GeneralConstants.USERS_ESTADOS.DESACTIVADO
        ]
      },
      getInfo : function(code){
        return GeneralConstants.USERS_ESTADOS.toArray().filter(p => p.code == code).pop().info
      }
    }

    static USER_AUTH = {
      TOKEN_KEY : 'inagbe_token',
      USERID_KEY : 'inagbe_user_id',
      USERNAME_KEY : 'inagbe_user_nome',
      USERPROFILE_KEY : 'inagbe_user_profile',
      USERUPDATECANDIDATURA_KEY : 'inagbe_user_update_candidatura'
    }
}
