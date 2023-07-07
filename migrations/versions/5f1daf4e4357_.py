"""empty message

Revision ID: 5f1daf4e4357
Revises: a3d9b04dbd68
Create Date: 2023-06-29 02:16:52.452911

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5f1daf4e4357'
down_revision = 'a3d9b04dbd68'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_name', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('is_admin', sa.Boolean(), nullable=False))
        batch_op.create_unique_constraint(None, ['user_name'])
        batch_op.drop_column('is_active')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('is_admin')
        batch_op.drop_column('user_name')

    # ### end Alembic commands ###
