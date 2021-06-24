<Window>
  <View>
    <Input
      inputMode="text"
      type="text"
      mode="danger"
      label="Descrição"
      hint="Preencha corretamente"
      onChange={this.setDescription}
    />
    <Input
      inputMode="tel"
      type="text"
      mode="danger"
      label="Tel."
      mask="(99) 99999-9999"
      hint="Preencha corretamente"
      onChange={this.setPhone}
    />
    {this.state.userFound && this.state.userFound.name}
    <Grid>
      <Button
        label={'Procurar'}
        type='primary'
        onClick={this.findUser}
      />

      {/* <Spacing size='sm' /> */}
      <Button
        label={'Inserir'}
        type='primary'
        onClick={this.create}
      />
      {/* <Spacing size='sm' /> */}

      <Button
        label={'Transferir'}
        type='primary'
        onClick={this.transfer}
      />
    </Grid>
    <Divisor line />
    {this.state.todoList.map(todo => {
      return (
        <View key={todo._id}>
          <CheckItem
            checked={todo.status}
            onChange={e => {
              this.onChangeHandler(todo, e)
            }}
            text={todo.description} />
        </View>
      )
    })}
  </View>
</Window>
