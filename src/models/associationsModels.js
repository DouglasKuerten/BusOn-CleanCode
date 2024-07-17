const Assistant = require('./assistant');
const Thread = require('./thread');
const Associacao = require('./associacao');
const TemplateDocumento = require('./templateDocumento');
const Parametro = require('./parametro');
const Instituicao = require('./instituicao');
const Curso = require('./curso');
const Usuario = require('./usuario');
const Pagamento = require('./pagamento');

Associacao.hasOne(Parametro, { foreignKey: 'associacaoId', onDelete: 'CASCADE' });
Parametro.belongsTo(Associacao, { foreignKey: 'associacaoId', onDelete: 'CASCADE' });

TemplateDocumento.belongsTo(Associacao, { foreignKey: 'associacaoId', onDelete: 'RESTRICT', });
Associacao.hasMany(TemplateDocumento, { foreignKey: 'associacaoId', onDelete: 'RESTRICT', });

Instituicao.belongsTo(Associacao, { foreignKey: 'associacaoId', onDelete: 'RESTRICT', });
Associacao.hasMany(Instituicao, { foreignKey: 'associacaoId', onDelete: 'RESTRICT', });

Curso.belongsTo(Instituicao, { foreignKey: 'instituicaoId', onDelete: 'RESTRICT' }); // Definir a associação
Instituicao.hasMany(Curso, { foreignKey: 'instituicaoId', onDelete: 'RESTRICT' }); // Definir a associação

Usuario.belongsTo(Associacao, { foreignKey: 'associacaoId', onDelete: 'RESTRICT', });
Associacao.hasMany(Usuario, { foreignKey: 'associacaoId', onDelete: 'RESTRICT', });

Usuario.belongsTo(Curso, { foreignKey: 'cursoId', onDelete: 'RESTRICT', });
Curso.hasMany(Usuario, { foreignKey: 'cursoId', onDelete: 'RESTRICT', });

Pagamento.belongsTo(Usuario, { foreignKey: 'usuarioId', onDelete: 'RESTRICT', });
Usuario.hasMany(Pagamento, { foreignKey: 'usuarioId', onDelete: 'RESTRICT', });


module.exports = {
    Assistant,
    Thread,
    Associacao,
    TemplateDocumento,
    Parametro,
    Instituicao,
    Curso,
    Usuario,
    Pagamento
}