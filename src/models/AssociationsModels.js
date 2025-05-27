import Associacao from './Associacao.js';
import TemplateDocumento from './TemplateDocumento.js';
import Parametro from './Parametro.js';
import Instituicao from './Instituicao.js';
import Curso from './Curso.js';
import Usuario from './Usuario.js';
import Pagamento from './Pagamento.js';

Associacao.hasOne(Parametro, { foreignKey: 'associacaoId', onDelete: 'CASCADE' });
Parametro.belongsTo(Associacao, { foreignKey: 'associacaoId', onDelete: 'CASCADE' });

TemplateDocumento.belongsTo(Associacao, { foreignKey: 'associacaoId', onDelete: 'RESTRICT', });
Associacao.hasMany(TemplateDocumento, { foreignKey: 'associacaoId', onDelete: 'RESTRICT', });

Instituicao.belongsTo(Associacao, { foreignKey: 'associacaoId', onDelete: 'RESTRICT', });
Associacao.hasMany(Instituicao, { foreignKey: 'associacaoId', onDelete: 'RESTRICT', });

Curso.belongsTo(Instituicao, { foreignKey: 'instituicaoId', onDelete: 'RESTRICT' });
Instituicao.hasMany(Curso, { foreignKey: 'instituicaoId', onDelete: 'RESTRICT' });

Usuario.belongsTo(Associacao, { foreignKey: 'associacaoId', onDelete: 'RESTRICT', });
Associacao.hasMany(Usuario, { foreignKey: 'associacaoId', onDelete: 'RESTRICT', });

Usuario.belongsTo(Curso, { foreignKey: 'cursoId', onDelete: 'RESTRICT', });
Curso.hasMany(Usuario, { foreignKey: 'cursoId', onDelete: 'RESTRICT', });

Pagamento.belongsTo(Usuario, { foreignKey: 'usuarioId', onDelete: 'RESTRICT', });
Usuario.hasMany(Pagamento, { foreignKey: 'usuarioId', onDelete: 'RESTRICT', });

export {
    Associacao,
    TemplateDocumento,
    Parametro,
    Instituicao,
    Curso,
    Usuario,
    Pagamento
}