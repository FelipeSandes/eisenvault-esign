# eisenvault-esign
Assinatura Eletrônica EisenVault para documentos PDF

## Instalação

Para fazer a instalação usando o AMP.

Coloque os arquivos Amp em sua pasta Alfresco amps / amps-share
Execute o script: bin / apply_amps. [Sh | bat] com a opção -force.

$_java -jar $ALF_HOME/bin/alfresco-mmt.jar install $ALF_HOME/amps_share $CATALINA_HOME/webapps/share.war -force -directory $*


## Passos para assinar seus documentos PDF
1. Adicione sua imagem de assinatura em seu perfil usando "Meu Perfil".
2. Abra o documento PDF em detalhes e use a ação "Adicionar assinatura eletrônica" para assiná-lo.
3. Uma nosa página de assinatura será criada no final do documento e será assinada com sua assinatura de perfil.
4. O mesmo documento pode ser assinado por vários usuários.
5. O nome completo do usuário que assinou o documento será mostrado com a data assinada.

É importante lembrar que a assinatura eletrônica não tem válidade legal em território brasileiro. A mesma pode ser usada para tramites internos dentro das organizações.

# Versões

Testado:

Alfresco 5.2 - Funcionando
Alfresco 6.0 - Funcionando
Alfresco 6.2 - Funcionando


# eisenvault-esign
EisenVault E-Signature for PDF Documents
##Steps to sign your PDF documents
1. Add your signature image in your profile using "My Profile".
2. Open PDF document in details and use "Add E-Signature" action to sign.
3. A new signature page will get created at the last of the document and get signed with your profile signature.
4. Same document can be signed by many users.
5. User's full name who has sign the document will be shown with signed date 
